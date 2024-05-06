it("renders the correct label and value", () => {
    render(<EmailInputField label="Email" value="test@example.com" />)
    const label = screen.getByText("Email:", { exact: false })
    expect(label).toBeOnTheScreen()

    // Validate the input value.
    const input = screen.getByDisplayValue("test@example.com")
    expect(input).toBeOnTheScreen()
})