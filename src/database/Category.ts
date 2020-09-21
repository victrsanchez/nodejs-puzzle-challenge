import {Entity,Column,PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm'
import { Recipe } from './Recipe';

@Entity()
export class Category{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name: string;
    
    @OneToMany( type => Recipe, recipe => recipe.category )
    recipes : Recipe[];
}