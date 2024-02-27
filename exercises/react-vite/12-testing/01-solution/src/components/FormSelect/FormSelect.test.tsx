import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import FormSelect from './FormSelect'

describe('FormSelect Component', () => {
    it('renders correctly with given props', () => {
        render(
            <FormSelect label="Test Label" onChange={() => { }} value="">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
            </FormSelect>
        )

        // Check if label is rendered correctly
        expect(screen.getByText(/test label/i)).toBeInTheDocument()

        // Check if select options are rendered
        expect(screen.getByRole('option', { name: 'Option 1' })).toBeInTheDocument()
        expect(screen.getByRole('option', { name: 'Option 2' })).toBeInTheDocument()
    })
})
