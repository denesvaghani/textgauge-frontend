import { Metadata } from 'next';
import ListDiffClient from './ListDiffClient';

export const metadata: Metadata = {
  title: 'List Diff & Unique Extractor | TextGauge',
  description: 'Clean messy lists, extract unique IDs, and compare two lists to find missing items. Free online tool for developers and data analysts.',
};

export default function ListDiffPage() {
  return <ListDiffClient />;
}
