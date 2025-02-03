import {Activity} from "@/domain/models/activity.ts";

export interface SkillNode {
	name: string;
	activities: Activity[]
}

