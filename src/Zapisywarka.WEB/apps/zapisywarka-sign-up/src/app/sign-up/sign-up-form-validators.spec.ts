import { FormControl, FormGroup } from "@angular/forms"
import { SignUpFormValidators } from "./sign-up-form-validator"

describe('sign-up form validators', () =>{
    
    describe('user name', ()=>{

        let control: FormControl

        beforeEach(() => {
            control = new FormControl('', SignUpFormValidators.userNameValidators())
        });
        
        it('should return null when is valid', ()=>{

            control.setValue('jan-adam.sz_3')            
            const error = control.errors
            expect(error).toBeNull()
                        
        })


        it('should be required', ()=> {
                      
            control.setValue('')
            const error = control.errors
            expect(error?.required).toBeDefined()
            expect(error?.required.message).toBe("Nazwa użytkownika jest wymagana") 
        })

        it('should have min 3 characters', ()=>{
            control.setValue('ja')
            const error = control.errors
            expect(error?.userNameMinLength).toBeDefined()
            expect(error?.userNameMinLength.message).toBe("Nazwa użytkownika musi mieć minimum 3 znaki")
            
        })       

        it('should should return error when user name contains not allowed characters', ()=>{
            control.setValue('jan#')
            const error = control.errors
            expect(error).toBeDefined()
            expect(error?.allowedCharacters.message).toBe("Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._")
        })

        it('should should return error when user name contains space', ()=>{
            control.setValue('jan b')
            const error = control.errors
            expect(error?.allowedCharacters).toBeDefined()
            expect(error?.allowedCharacters.message).toBe("Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._")
        })


        it('should should return error when user name contains polish characters', ()=>{
            
            control.setValue('bożena')
            const error = control.errors
            expect(error?.allowedCharacters).toBeDefined()
            expect(error?.allowedCharacters.message).toBe("Nazwa użytkownika nie może zaweirać polskich znaków.")
        })

        it('should should return error when user name contains emoji', ()=>{
            
            control.setValue('bozena😀')
            const error = control.errors
            expect(error?.allowedCharacters).toBeDefined()
            expect(error?.allowedCharacters.message).toBe("Nazwa użytkownika nie może zaweirać polskich znaków.")
        })

      

        describe('getErrorMessages', ()=>{

            let group: FormGroup

            beforeEach(()=> {
                const control = new FormControl('')
                group = new FormGroup({userName: control})
            })

            it('should return empty array when there is no error', ()=> {
                group.get('usernName')?.setValue("i")
                
                const messages = SignUpFormValidators.getErrorMessagesFor('userName', group)

                expect(messages).toHaveLength(0)
            })

            it('should return message error when one error', ()=> {
                
                group.get('userName')?.setErrors({reguired: {
                    message: "Nazwa użytkownika jest wymagana"
                }})

                expect(group.invalid).toBe(true)
                
                const messages = SignUpFormValidators.getErrorMessagesFor('userName', group)

                expect(messages).toHaveLength(1)
                expect(messages[0]).toBe("Nazwa użytkownika jest wymagana")
            })

            it('should return messages when many errors', ()=> {
                group.get('userName')?.setErrors({
                    reguired: {
                    message: "Nazwa użytkownika jest wymagana"
                }, invalid: {
                    message: "Nazwa użytkownika nie jest poprawna"
                }
            
            })                                               
                const messages = SignUpFormValidators.getErrorMessagesFor('userName', group)

                expect(messages).toHaveLength(2)
                expect(messages).toStrictEqual(["Nazwa użytkownika jest wymagana", "Nazwa użytkownika nie jest poprawna"])
            })
        })
    })
} )