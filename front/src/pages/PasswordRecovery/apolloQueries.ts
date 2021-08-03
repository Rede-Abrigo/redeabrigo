import { gql } from '@apollo/client';

export const PASSWORD_RECOVERY = gql`
mutation ResetPassword($email: String!){
  recoverPassword(email: $email)
}
`;