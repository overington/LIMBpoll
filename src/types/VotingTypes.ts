// This file contains the types for the voting module

// Type for the scenarios
export type ScenariosType = {
    [key: string]: ScenarioType
}

// Single scenario type
export type ScenarioType = {
    id: string,
    title: string,
    description: string,
    card_type: CardTypeEnum,
    options: string[]
} 

// Enum for scenario type
export enum CardTypeEnum {
    SingleChoice = 'single-choice',
    MultipleChoice = 'multiple-choice',
    Text = 'text'
}