import { Resolver, Query, Mutation, Field, ObjectType, Arg } from "type-graphql";
import { container } from "tsyringe";

import Abrigo from '../../typeorm/entities/Abrigo';

import CreateAbrigoService from '../../../services/CreateAbrigoService';
import UpdateAbrigoService from '../../../services/UpdateAbrigoService';
import DeleteAbrigoService from "@modules/abrigos/services/DeleteAbrigoService";

import { CriarAbrigoInput } from "./CreateAbrigoInput";
import { AtualizarAbrigoInput } from "./UpdateAbrigoInput";

import AbrigosRepository from "../../typeorm/repositories/AbrigosRepository";
import { getCustomRepository } from "typeorm";

import ExcelJS from 'exceljs';
import TemporaryFiles from 'tmp';
import path from 'path';

@ObjectType()
class AbrigoResponse {
    @Field(() => Abrigo, { nullable: true })
    abrigo?: Abrigo;
}

@Resolver()
export class AbrigoResolver {
    @Mutation(() => AbrigoResponse)
    async criarAbrigo(
        @Arg("options") options: CriarAbrigoInput
      ): Promise<AbrigoResponse> {

        const createAbrigo = container.resolve(CreateAbrigoService);
        const abrigo = await createAbrigo.execute(options);
        return { abrigo };

    }
 
    @Query(() => AbrigoResponse)
    async verAbrigo(
        @Arg("id") id: number
    ): Promise<AbrigoResponse> {

        const abrigosRepository = getCustomRepository(AbrigosRepository);
        const abrigo = await abrigosRepository.findById(id);
        return { abrigo };

    }

    @Mutation(() => AbrigoResponse)
    async atualizarAbrigo(
        @Arg("options") options: AtualizarAbrigoInput
    ): Promise<AbrigoResponse> {

        const updateAbrigo = container.resolve(UpdateAbrigoService);
        const abrigo = await updateAbrigo.execute(options);
        return { abrigo };

    }

    @Mutation(() => Boolean)
    async deletarAbrigo(
        @Arg("id") id: number
    ): Promise<boolean> {
       
        const deleteAbrigo = container.resolve(DeleteAbrigoService);
        await deleteAbrigo.execute( { id } );
        return true;
    }
 
    @Query(() => [Abrigo])
    async procurarAbrigos(
        @Arg("nome") nome: string
    ): Promise<Abrigo[]> {

        const abrigosRepository = getCustomRepository(AbrigosRepository);
        const abrigos = await abrigosRepository.findByName(nome);
        return abrigos;

    }

    @Query(() => [Abrigo])
    async verAbrigos(): Promise<Abrigo[]> {

        const abrigosRepository = getCustomRepository(AbrigosRepository);
        const abrigos = await abrigosRepository.findAll();
        return abrigos;

    }

    @Query(() => String)
    async exportarAbrigos() : Promise<string> {
        const abrigosRepository = getCustomRepository(AbrigosRepository);
        const abrigos = await abrigosRepository.findAll();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Abrigos');
        worksheet.columns = [
            { header: 'ID', key: 'id' },
            { header: 'Nome', key: 'nome' },
            { header: 'Telefone 1', key: 'telefone1' },
            { header: 'Telefone 2', key: 'telefone2' },
            { header: 'Email 1', key: 'email1' },
            { header: 'Email 2', key: 'email2' },
            { header: 'Endereço', key: 'endereco' },
            { header: 'Bairro', key: 'bairro' },
            { header: 'Estado', key: 'estado' },
            { header: 'Cidade', key: 'cidade' },
            { header: 'Classificação', key: 'classificacao' },
            { header: 'Capacidade', key: 'capacidade' },
            { header: 'Faixa etária', key: 'faixaEtaria' },
            { header: 'LGBT', key: 'lgbt' },
            { header: 'Gênero', key: 'genero' },
            { header: 'PCD', key: 'pcd' },
            { header: 'Observação', key: 'observacao' },
        ]

        worksheet.addRows(abrigos);
        const file = TemporaryFiles.fileSync({postfix: '.xlsx'});
        await workbook.xlsx.writeFile(file.name);
        const filename = path.basename(file.name);
        const url = `/download/${filename}`;

        return url;
    }
}