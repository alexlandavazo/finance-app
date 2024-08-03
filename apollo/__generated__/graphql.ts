/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createPurchase: Purchase;
  deletePurchase?: Maybe<Scalars['Boolean']['output']>;
  editPurchase?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationCreatePurchaseArgs = {
  purchaseInput?: InputMaybe<PurchaseInput>;
};


export type MutationDeletePurchaseArgs = {
  ID: Scalars['ID']['input'];
};


export type MutationEditPurchaseArgs = {
  ID: Scalars['ID']['input'];
  purchaseInput?: InputMaybe<PurchaseInput>;
};

/** A purchase is a payment that the user did */
export type Purchase = {
  __typename?: 'Purchase';
  amount: Scalars['Float']['output'];
  article: Scalars['String']['output'];
  category?: Maybe<Scalars['String']['output']>;
  date: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  paymentMethod: Scalars['String']['output'];
};

export type PurchaseInput = {
  amount: Scalars['Float']['input'];
  article: Scalars['String']['input'];
  category?: InputMaybe<Scalars['String']['input']>;
  date: Scalars['Date']['input'];
  paymentMethod: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  /** Query to get purchases */
  getPurchases: Array<Purchase>;
};

export type CreatePurchaseMutationVariables = Exact<{
  purchaseInput?: InputMaybe<PurchaseInput>;
}>;


export type CreatePurchaseMutation = { __typename?: 'Mutation', createPurchase: { __typename?: 'Purchase', id: string, amount: number, paymentMethod: string, article: string, date: any } };

export type GetPurchasesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPurchasesQuery = { __typename?: 'Query', getPurchases: Array<{ __typename?: 'Purchase', id: string, date: any, amount: number, paymentMethod: string, article: string, category?: string | null }> };


export const CreatePurchaseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePurchase"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"purchaseInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PurchaseInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPurchase"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"purchaseInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"purchaseInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"article"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]} as unknown as DocumentNode<CreatePurchaseMutation, CreatePurchaseMutationVariables>;
export const GetPurchasesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPurchases"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPurchases"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"article"}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}}]}}]} as unknown as DocumentNode<GetPurchasesQuery, GetPurchasesQueryVariables>;