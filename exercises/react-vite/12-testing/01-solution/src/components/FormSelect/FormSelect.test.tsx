import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
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

    it('calls onChange with the right value when selection changes', async () => {
        const handleChange = vi.fn()
        render(
            <FormSelect label="Test Label" onChange={handleChange} value="option1">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
            </FormSelect>
        )

        // Simulate user changing the selection
        await userEvent.selectOptions(
            screen.getByRole('combobox'),
            'option2'
        )

        // Check if onChange was called with the right value
        expect(handleChange).toHaveBeenCalledWith('option2')
    })
})
