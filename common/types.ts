import { FieldValue } from 'firebase/firestore';

export interface Example {
	japanese: string;
	english: string;
}

export interface Examples {
	input: string;
	exampleSentences: Example[];
	explanation: string;
	createdAt: FieldValue;
	updatedAt: FieldValue;
}

export interface ApiResponse {
	text: string;
}
