import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import Modulo from '@modules/cursos/infra/typeorm/entities/Modulo';

@ObjectType()
@Entity('aulas')
class Aula {
    @Field()
    @PrimaryGeneratedColumn()
    id!: string;

    @Field()
    @Column({ type: "int" })
    ordem: number;

    @Field()
    @Column()
    nome: string;

    @Field()
    @Column()
    video_url: string;

    @Field()
    @Column()
    duracao: string;

    @Field()
    @Column()
    status: string;

    @Field(() => Modulo)
    @ManyToOne(() => Modulo, modulo => modulo.aulas)
    modulo: Modulo;
    
    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}

export default Aula;