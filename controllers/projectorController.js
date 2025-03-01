const db = require('../config/database');

exports.addProjector = async (req, res) => {
    try {
        const { name, status } = req.body;
        await db.run('INSERT INTO projectors (name, status) VALUES (?, ?)', [name, status || 'working']);
        res.status(201).json({ message: 'Projecteur ajouté avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.updateProjector = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await db.run('UPDATE projectors SET status = ? WHERE id = ?', [status, id]);
        res.json({ message: 'Projecteur mis à jour' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.deleteProjector = async (req, res) => {
    try {
        const { id } = req.params;
        await db.run('DELETE FROM projectors WHERE id = ?', [id]);
        res.json({ message: 'Projecteur supprimé' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.getProjectors = async (req, res) => {
    try {
        const projectors = await db.all('SELECT * FROM projectors WHERE status = "working"');
        res.json(projectors);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};
