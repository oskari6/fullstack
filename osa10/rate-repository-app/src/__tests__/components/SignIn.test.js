import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { SignInContainer } from "../../components/SignIn";

describe("SignIn", () => {
  describe("SignIn", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const onSubmit = jest.fn();
      render(<SignInContainer onSubmit={onSubmit} />);

      const usernameField = screen.getByPlaceholderText("Username");
      const passwordField = screen.getByPlaceholderText("Password");
      const submitButton = screen.getByText("Sign in");

      fireEvent.changeText(usernameField, "kalle");
      fireEvent.changeText(passwordField, "password");

      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);

        expect(onSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            username: "kalle",
            password: "password",
          }),
          expect.anything(),
        );
      });
    });
  });
});
