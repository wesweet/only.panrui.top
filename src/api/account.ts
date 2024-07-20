import { NEST_API_URL } from "@/config/app";
export const ACCOUNT_API = {
 saveAccount: `${NEST_API_URL}/account/saveAccount`,
 getAccountList: `${NEST_API_URL}/account/getAccountList`,
 deleteAccount: `${NEST_API_URL}/account/deleteAccount`,
}