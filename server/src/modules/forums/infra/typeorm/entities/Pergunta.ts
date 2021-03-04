import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import Resposta from '@modules/forums/infra/typeorm/entities/Resposta';
// import Categoria from '@modules/forums/infra/typeorm/entities/Categoria';

@ObjectType()
@Entity('forum_perguntas')
class Pegunta {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    titulo: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    corpo: string;

    @Field({ nullable: true })
    @Column({ default: false, type: "bool", nullable: true})
    foiResolvido: boolean;

    @Field(() => [Resposta])
    @OneToMany(() => Resposta, resposta => resposta.pergunta)
    respostas?: Resposta[];

    // @Field(() => [Categoria])
    // @ManyToMany(() => Categoria, categoria => categoria.resposta)
    // categorias?: Categoria[];
    
    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}

export default Pegunta;