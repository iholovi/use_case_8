import {validateUsername, validateEmail} from "./validators";

describe('Validation functions', () => {
    describe('validateUsername', () => {
        it('should return false if username is empty', () => {
            const username = '';
            expect(validateUsername(username)).toBe(false);
        });

        it('should return true if username is not empty', () => {
            const username = 'testUser';
            expect(validateUsername(username)).toBe(true);
        });
    });

    describe('validateEmail', () => {
        it('should return false if email is empty', () => {
            const email = '';
            expect(validateEmail(email)).toBe(false);
        });

        it('should return false if email is not valid', () => {
            const email = 'testEmail';
            expect(validateEmail(email)).toBe(false);
        });

        it('should return true if email is valid', () => {
            const email = 'testEmail@example.com';
            expect(validateEmail(email)).toBe(true);
        });
    });
});