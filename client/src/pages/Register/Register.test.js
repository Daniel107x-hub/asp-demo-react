import { renderWithProviders } from "../../utils/test-utils"
import Register from "./Register";

describe('Loads the resgistration screen', () => {
    it('Loads registration without breaking', () => {
        renderWithProviders(<Register/>);
    })

    it('Matches DOM snapshot', () => {
        const domeTree = renderWithProviders(<Register/>).asFragment();
        expect(domeTree).toMatchSnapshot();
    })
})