import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import User from '@modules/users/infra/typeorm/entities/User';

@ObjectType()
@Entity('notificacoes')
class Notificacao {
    @Field()
    @PrimaryGeneratedColumn()
    id!: string;

    @Field()
    @Column()
    conteudo: string;

    @Field()
    @Column({ default: false, type: "bool" })
    arquivada: boolean;

    @Field()
    @Column({ nullable: true })
    tipo: string;

    @Field(() => User, { nullable: true })
    @ManyToOne(() => User, user => user.notificacoes)
    user?: User;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}

export default Notificacao;