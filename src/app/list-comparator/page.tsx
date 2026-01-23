import { Metadata } from 'next';
import ListComparatorClient from './ListComparatorClient';

export const metadata: Metadata = {
  title: 'List Comparator & Unique Extractor | TextGauge',
  description: 'Clean messy lists, extract unique IDs, and compare two lists to find missing items. Free online tool for developers and data analysts.',
};

export default function ListComparatorPage() {
  return <ListComparatorClient />;
}
