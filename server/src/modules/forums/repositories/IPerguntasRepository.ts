import Pergunta from '@modules/forums/infra/typeorm/entities/Pergunta';
import ICreatePerguntaDTO from '../dtos/ICreatePerguntaDTO';
import IUpdatePerguntaDTO from '../dtos/IUpdatePerguntaDTO';

export default interface IPerguntasRepository {
    findById(id: string): Promise<Pergunta | undefined>;
    findAll(): Promise<Pergunta[]>;
    save(pergunta: Pergunta): Promise<Pergunta>;
    create(data: ICreatePerguntaDTO): Promise<Pergunta>;
    update(perguntaId: string, data: IUpdatePerguntaDTO): Promise<Pergunta | undefined>;
    delete(id: string): Promise<Boolean>;
}