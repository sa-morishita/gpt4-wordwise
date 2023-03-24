import { FieldValue } from 'firebase/firestore';

export interface SentencePair {
	japanese: string;
	english: string;
}

export interface WordInfo {
	word: string;
	sentencePairArray: SentencePair[];
	explanation: string;
	createdAt: FieldValue | number;
	updatedAt: FieldValue | number;
}

export interface ApiResponse {
	text: string;
}
