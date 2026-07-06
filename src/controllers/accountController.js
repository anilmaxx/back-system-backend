const Account = require('../models/Account');

//generate unique account number
const generateAccountNumber = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}
exports.createAccount = async (req, res) => {
    try {
        const { accountType } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        
        //check if user already has an account of the same type
        const existingAccount = await Account.findOne({ user: userId, accountType });
        if (existingAccount) {
            return res.status(400).json({ message: 'You already have an account of this type' });

        }
        const newAccount = new Account({
            user: userId,
            accountNumber: generateAccountNumber(),
            accountType
        });
        await newAccount.save();
        res.status(201).json({ message: 'Account created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating account', error });
    }
}

exports.getMyAccounts = async (req, res) => {
    try {
        const userId = req.user?.id
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const accounts = await Account.find({ user: userId }).populate('user', ['name', 'email']);
        if (!accounts || accounts.length === 0) {
            return res.status(404).json({ msg: 'No accounts found for this user' });
        }
        res.json(accounts);

    } catch (error) {
        console.error(err.message);
       res.status(500).send('Server Error');
    }
}