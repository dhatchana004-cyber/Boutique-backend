const prisma = require('../config/db');

// @desc    Submit a new enquiry
// @route   POST /api/enquiries
// @access  Public
exports.submitEnquiry = async (req, res) => {
    try {
        const { firstName, lastName, email, enquiryType, message } = req.body;

        if (!firstName || !lastName || !email || !message) {
            return res.status(400).json({ success: false, message: 'Please provide all required fields' });
        }

        const enquiry = await prisma.enquiry.create({
            data: {
                firstName,
                lastName,
                email,
                enquiryType: enquiryType || 'General',
                message
            }
        });

        res.status(201).json({ success: true, message: 'Enquiry submitted successfully', data: enquiry });
    } catch (error) {
        console.error('Submit Enquiry Error:', error);
        res.status(500).json({ success: false, message: 'Server error while submitting enquiry' });
    }
};

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Private/Admin
exports.getEnquiries = async (req, res) => {
    try {
        const enquiries = await prisma.enquiry.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.status(200).json({ success: true, count: enquiries.length, data: enquiries });
    } catch (error) {
        console.error('Get Enquiries Error:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching enquiries' });
    }
};

// @desc    Update enquiry status
// @route   PUT /api/enquiries/:id
// @access  Private/Admin
exports.updateEnquiryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ success: false, message: 'Status is required' });
        }

        const enquiry = await prisma.enquiry.update({
            where: { id: parseInt(id) },
            data: { status }
        });

        res.status(200).json({ success: true, message: 'Enquiry updated successfully', data: enquiry });
    } catch (error) {
        console.error('Update Enquiry Error:', error);
        res.status(500).json({ success: false, message: 'Server error while updating enquiry' });
    }
};

// @desc    Delete enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private/Admin
exports.deleteEnquiry = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.enquiry.delete({
            where: { id: parseInt(id) }
        });

        res.status(200).json({ success: true, message: 'Enquiry deleted successfully' });
    } catch (error) {
        console.error('Delete Enquiry Error:', error);
        res.status(500).json({ success: false, message: 'Server error while deleting enquiry' });
    }
};
