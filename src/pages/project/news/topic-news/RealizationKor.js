import React from 'react';
import retrieveCluster from '../../../../api/ClusterSearchApiChrono';
import detectEvent from '../../../../api/DetectEventApiChrono';
import korPhrase from '../../../../api/PhraseApiChrono';
import chronoSum from '../../../../api/SumApiChrono';
import generateTitle from '../../../../api/TitleBartApiChrono';
import ComplexNewsSearch from '../../../../project/components/common/ComplexNewsSearch';
import Realization from '../../../../project/Realization';
import { categories, realizationInputJson, sources } from '../../../../project/SettingsKor';


const phraseOptions = [
    {
        text: 'substring',
        name: 'phraseOption',
        value: { phraseOption: 'substring' },
    },
    {
        text: 'subsequence',
        name: 'phraseOption',
        value: { phraseOption: 'subsequence' },
    },
    // {
    //     text: 'bpe',
    //     name: 'phraseOption',
    //     value: { phraseOption: 'bpe' },
    // },
];

const sumOptions = [
    {
        text: 'TextRank',
        name: 'sumOption',
        value: { sumOption: 'textrank' },
    },
    {
        text: 'BertSum',
        name: 'sumOption',
        value: { sumOption: 'bertsum' },
    },
];

function RealizationKor() {
    return (
        <Realization
            searcher={ComplexNewsSearch}
            inputJson={realizationInputJson}
            categories={categories}
            sources={sources}
            retrieveCluster={retrieveCluster}
            detectEvent={detectEvent}
            doSum={chronoSum}
            doPhrase={korPhrase}
            generateTitle={generateTitle}
            phraseOptions={phraseOptions}
            sumOptions={sumOptions}
        />
    );
}

export default RealizationKor;
