import { FieldValue } from 'firebase/firestore';

interface Example {
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
