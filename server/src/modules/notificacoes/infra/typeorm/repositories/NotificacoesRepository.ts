import INotificacoesRepository from '@modules/notificacoes/repositories/INotificacoesRepository'
import Notificacao from '../entities/Notificacao';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import ICreateNotificacaoDTO from '@modules/notificacoes/dtos/ICreateNotificacaoDTO';
import IUpdateNotificacaoDTO from '@modules/notificacoes/dtos/IUpdateNotificacaoDTO';

@EntityRepository(Notificacao)
class NotificacoesRepository implements INotificacoesRepository {
    private ormRepository: Repository<Notificacao>;

    constructor() {
        this.ormRepository = getRepository(Notificacao);
    }
  
    public async findById(id: number): Promise<Notificacao | undefined> {
    
        const notificacao = await this.ormRepository.findOne({ where: { id }, relations: ["user"]  });
        return notificacao;
    
    }
  
    public async findAll(): Promise<Notificacao[]> {
  
        let notificacoes: Notificacao[];
        notificacoes = await this.ormRepository.find({ relations: ["user"] });
        return notificacoes;
  
    }
  
    public async create({
        conteudo,
        arquivada,
        tipo,
        userId
    }: ICreateNotificacaoDTO): Promise<Notificacao | undefined> {
  
        const newNotificacao = this.ormRepository.create({ 
            conteudo,
            arquivada,
            tipo,
            user: { id: userId }
        });
        await this.ormRepository.save(newNotificacao);
        const notificacao = await this.ormRepository.findOne({ where: { id: newNotificacao.id }, relations: ["user"] }); // need this line to return all fields from Abrigo, maybe eager loader would solve it
        return notificacao;
  
    }
  
    public async save(notificacao: Notificacao): Promise<Notificacao> {
  
      return this.ormRepository.save(notificacao);
  
    }
  
    public async update(notificacaoId: number, { 
      conteudo,
      arquivada,
      tipo,
      userId
    }: IUpdateNotificacaoDTO): Promise<Notificacao | undefined> {
  
      await this.ormRepository.update(
        notificacaoId, 
        { 
          id: notificacaoId, 
          conteudo,
          arquivada,
          tipo,
          user: { id: userId }
        }
      );   
      const notificacao = await this.ormRepository.findOne({ where: { id: notificacaoId }, relations: ["user"] });
      return notificacao;
  
    }
  
    public async delete(id: number): Promise<boolean> {
  
      await this.ormRepository.delete( id );
      return true;
  
    }
  }
  
  export default NotificacoesRepository;