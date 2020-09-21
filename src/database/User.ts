import {Entity,Column,PrimaryGeneratedColumn, OneToMany, JoinTable} from 'typeorm'
import { Recipe } from './Recipe';

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany( type => Recipe, recipe => recipe.user)
    recipes: Recipe[];
   
}