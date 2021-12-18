import { AeropressBrew } from '@prisma/client';
import { GrindSize } from './GrindSize.enum';
import { RoastType } from './RoastType.enum';

export interface IAeropressBrew extends AeropressBrew {
	id: string;
	name: string;
	brewTime: number;
	waterTemp: number;
	coffeeWeight: number;
	waterWeight: number;
	grindSize: GrindSize;
	roastType: RoastType;
	inverted: boolean;
	instructions: string | null;
	description: string | null;
	createdAt: Date;
	updatedAt: Date;
	favorite: boolean;
	userId: string;
}
