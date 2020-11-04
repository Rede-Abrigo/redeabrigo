import { Resolver, Query, Mutation, Field, ObjectType, Arg, InputType, Ctx } from "type-graphql";
import User from '../infra/typeorm/entities/User';
import CreateUserService from '../services/CreateUserService';
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import { getCustomRepository } from "typeorm";

// Tlvz um DTO
@InputType()
export class UsernamePasswordInput {
    @Field()
    password: string;
    @Field()
    nome: string;
    @Field()
    idade: string;
    @Field()
    profissao: string;
    @Field()
    email: string;
}

// Importar as classes de Erros do Rocket
@ObjectType()
class FieldError {
    @Field()
    field: string;
    @Field()
    message: string;
}

// Não identifiquei um similar desse user response
@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];
  
    @Field(() => User, { nullable: true })
    user?: User;
}

@Resolver()
export class UserResolver {
    @Mutation(() => UserResponse)
    async register(
        @Arg("options") options: UsernamePasswordInput
      ): Promise<UserResponse> {

        const createUser = new CreateUserService();

        const user = await createUser.execute(options);

        return { user };
      }
    
    // @Mutation(() => UserResponse)
    // async login() {}


    @Query(() => [User])
    async users(): Promise<User[]> {
        const usersRepository = getCustomRepository(UsersRepository);
        const users = await usersRepository.findAll();
        return users;
    }

    // @Mutation(() => [User])
    // async updateUser()

    // @Mutation(() => Boolean)
    // async deleteUser()

    @Query(() => String)
    hello() {
        return "I say goodbye... Hello Hello!";
    }
}