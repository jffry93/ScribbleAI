import { t } from '../../trpc';
import { coverLetter } from './../jarvis/coverLetter';
import { questionAnswer } from './../jarvis/questionAnswer';
import { makeFancy } from './../jarvis/makeFancy';
import { showAppreciation } from './showAppreciation';
import { grammarPolice } from './grammarPolice';
import { thesaurusRex } from './thesaurus';

export const jarvisRouter = t.router({
	showAppreciation: showAppreciation,
	coverLetter: coverLetter,
	questionAnswer: questionAnswer,
	makeFancy: makeFancy,
	grammarPolice: grammarPolice,
	thesaurusRex: thesaurusRex,
});
