import { render, screen } from '@testing-library/react';
import { MultiSelectBadge, MultiSelectOption } from './multi-select';
it('should render a button with the provided label', () => {
    render(<MultiSelectBadge label="Test Label"/>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Test Label');
  });

  it('should render the option label when the option is not filtered', () => {
    const option = { label: 'Option 1', value: 'option1' }
    const { getByText } = render(<MultiSelectOption {...option} />)
    expect(getByText('Option 1')).toBeInTheDocument()
  })
