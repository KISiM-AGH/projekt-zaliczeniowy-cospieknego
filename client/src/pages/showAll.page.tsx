import { ReactElement } from 'react';
import { ResultsContainer } from '../containers';
import selectionFilter from '../utils/selectionFilter';
import useContent from '../hooks/useContent';
// import * as ts from 'typescript';

export default function ShowAllPage({
    category,
}: {
    category: 'albums' | 'playlists' | 'podcasts' | 'artists' | 'tracks';
}): ReactElement {
    const albums = useContent('albums');
    //eval(`const ${category} = ${useContent(category)};`); // hmmmm?
    // let code: string = `const ${category} = 111`;
    // let result = ts.transpile(code);
    // let runnable: any = eval(result);

    const slides = selectionFilter({
        albums,
    });

    return <ResultsContainer slides={slides} type={category} />;
}
