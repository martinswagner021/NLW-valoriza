import { EntityRepository, Repository } from "typeorm";
import { Compliment } from "../entity/Compliment";

@EntityRepository(Compliment)
export class ComplimentsRepositories extends Repository<Compliment> {}