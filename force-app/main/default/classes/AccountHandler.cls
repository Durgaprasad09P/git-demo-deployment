public class AccountHandler {
    public static Account insertNewAccount(String name) {
        try {
            Account acc = new Account(Name = name);
            insert acc;
            system.debug(acc);
            return acc;
        } catch (DmlException e) {
            // Handle DML exceptions such as inserting an account with an empty name
            return null;
        }
    }
}