exports.createExpense = async (req, res) => {
    try {
        const expense = new req.Expenses(req.body);
        const savedExpense = await expense.save();
        res.status(201).json(savedExpense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getExpenseById = async (req, res) => {
    try {
        const expense = await req.Expenses.findById(req.params.id);
        if (!expense) return res.status(404).json({ message: 'Expense not found' });
        res.json(expense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await req.Expenses.find().sort({ date: -1 });
        res.json(expenses);
        console.log(req.Expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateExpenses = async (req, res) => {
    try {
        const updatedExpense = await req.Expenses.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Return updated document
        );
        if (!updatedExpense) return res.status(404).json({ message: 'Expense not found' });
        res.json(updatedExpense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};