import { t } from '../../trpc';
import { coverLetter } from './../jarvis/coverLetter';
import { questionAnswer } from './../jarvis/questionAnswer';
import { makeFancy } from './../jarvis/makeFancy';

export const jarvisRouter = t.router({
	coverLetter: coverLetter,
	questionAnswer: questionAnswer,
	makeFancy: makeFancy,
});
