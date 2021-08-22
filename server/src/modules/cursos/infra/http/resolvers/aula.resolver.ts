import { Resolver, Query, Mutation, Field, ObjectType, Arg, InputType } from "type-graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { container } from "tsyringe";

import Aula from '../../typeorm/entities/Aula';

import CreateAulaService from '../../../services/CreateAulaService';
import UpdateAulaService from '../../../services/UpdateAulaService';
import DeleteAulaService from '../../../services/DeleteAulaService';

import { getCustomRepository } from "typeorm";
import AulasRepository from "../../typeorm/repositories/AulasRepository";
import { createWriteStream } from "fs";
import path from 'path';

// Preciso usar o DTO
@InputType()
class CriarAulaInput {
    @Field({ nullable: true })
    ordem: number;
    @Field({ nullable: true })
    nome: string;
    @Field({ nullable: true })
    descricao: string;
    @Field({ nullable: true })
    video_url: string;
    @Field({ nullable: true })
    duracao: string;
    @Field({ nullable: true })
    moduloId: number;
}

@InputType()
class AtualizarAulaInput {
    @Field()
    aulaId: number;
    @Field({ nullable: true })
    ordem?: number;
    @Field({ nullable: true })
    nome?: string;
    @Field({ nullable: true })
    descricao: string;
    @Field({ nullable: true })
    video_url?: string;
    @Field({ nullable: true })
    duracao?: string;
    @Field({ nullable: true })
    moduloId?: number;
}

@ObjectType()
class AulaResponse {
    @Field(() => Aula, { nullable: true })
    aula?: Aula;
}

@ObjectType()
class ArquivoResponse {
    @Field()
    filename: string;
    @Field()
    mimetype: string;
    @Field()
    encoding: string;
}

@Resolver()
export class AulaResolver {
    @Mutation(() => ArquivoResponse)
    async UploadArquivoParaAula(
        @Arg("file", () => GraphQLUpload)
        { createReadStream, filename, encoding, mimetype }: FileUpload
    ): Promise<ArquivoResponse> {

        filename = new Date().toISOString() + filename;

        await new Promise(response => createReadStream()
            .pipe(createWriteStream(
                path.join('/var/www/server/files/', filename)
            ))
            .on("close", response)
        );

        return {
            filename: filename,
            mimetype: encoding,
            encoding: mimetype
        };
    }

    @Mutation(() => AulaResponse)
    async criarAula(
        @Arg("options") options: CriarAulaInput
      ): Promise<AulaResponse> {

        const createAula = new CreateAulaService();
        const aula = await createAula.execute(options);
        return { aula };

    }
 
    @Query(() => AulaResponse)
    async verAula(
        @Arg("id") id: number
    ): Promise<AulaResponse> {

        const aulasRepository = getCustomRepository(AulasRepository);
        const aula = await aulasRepository.findById(id);
        return { aula };

    }

    @Mutation(() => AulaResponse)
    async atualizarAula(
        @Arg("options") options: AtualizarAulaInput
    ): Promise<AulaResponse> {

        const updateAula = container.resolve(UpdateAulaService);
        const aula = await updateAula.execute(options);
        return { aula };

    }

    @Mutation(() => Boolean)
    async deletarAula(
        @Arg("id") id: number
    ): Promise<boolean> {
       
        const deleteAula = new DeleteAulaService();
        await deleteAula.execute( { id } );
        return true;
    }

    @Query(() => [Aula])
    async verAulas(): Promise<Aula[]> {

        const aulasRepository = getCustomRepository(AulasRepository);
        const aulas = await aulasRepository.findAll();
        return aulas;

    }
}