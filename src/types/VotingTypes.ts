// This file contains the types for the voting module

// Type for the scenarios
export type HomeProps = {
    scenarios: {
        [key: string]: ScenarioType
    }
    network_msgs: {
        [key: string]: string
    }
}

// Single scenario type
export type ScenarioType = {
    id: number,
    title: string,
    description: string,
    voting_card_type: VotingCardTypeEnum,
    options: string[]
} 

// Enum for scenario type
export enum VotingCardTypeEnum {
    SingleChoice = 'single-choice',
    MultipleChoice = 'multiple-choice',
    Text = 'text'
}

// Server types
export type StateType = {
    current_scenario: string
    vote_count: number
}

