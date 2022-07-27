import { fireEvent, render, screen } from "@testing-library/react";
import NewPostButton from ".";

it("Should reset the form when submit is clicked", () => {
    //arrange: render the component, and insert text into input fields
    const mockLoadPosts = jest.fn();
    render(<NewPostButton loadPosts={mockLoadPosts} />);

    fireEvent.click(screen.getByText("New Post"));

    expect(screen.getByText("Create New Post")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Title"), {
        target: {
            value: "Test",
        },
    });

    fireEvent.change(screen.getByLabelText("Name"), {
        target: {
            value: "Test",
        },
    });

    fireEvent.change(screen.getByLabelText("Comment"), {
        target: {
            value: "Test",
        },
    });

    //act click "submit" button
    const button = screen.getByText("Submit");
    fireEvent.click(button);

    //assert check that the inputs have been cleared
    expect(screen.getByLabelText("Title")).toHaveValue("");
    expect(screen.getByLabelText("Name")).toHaveValue("");
    expect(screen.getByLabelText("Comment")).toHaveValue("");
});

//UI Testing

//Arrange   - "Prepare UI to receive the action" i.e. if you want to test a nested component, the parent must be open so that its child is accessible
//Act       - Emulating user behaviour (real action a user could carry out on the page)
//Assert    - Check that the outcome is as expected

//it (does the same as test())

//nock - library that allows for req res matchers to be set up for testing
