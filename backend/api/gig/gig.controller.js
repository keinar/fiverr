// Gig CRUDL API
import { gigService } from './gig.service.js'

const MAX_GIG_VISITED = 3

// List
export async function getGigs(req, res) {    
    // const filterBy = {
    //     title: req.query.title || '',
    //     severity: +req.query.severity || 0,
    //     pageIdx: req.query.pageIdx || undefined,
    //     sortBy: req.query.sortBy || '',
    //     sortDir: req.query.sortDir || 1,
    //     lables: req.body.lables || undefined,
    //     userId: req.query.userId || undefined
    // }

    try {
        // const gigs = await gigService.query(filterBy)
        const gigs = await gigService.query()
        res.send(gigs)
    } catch (err) {
        res.status(400).send(`Couldn't get gigs...`)
    }
}

//  Save
export async function addGig(req, res) {
    const { title, severity, description, createdAt, lables } = req.body
    // Better use createGig()
    const gigToSave = { title, severity: +severity, description, createdAt, lables }

    try {
        const savedGig = await gigService.add(gigToSave, req.loggedinUser)
        res.send(savedGig)
    } catch (err) {
        console.log(err)
        res.status(400).send(`Couldn't save gig...`)
    }
}
export async function updateGig(req, res) {
    const { _id, title, severity, description, lables } = req.body
    const gigToSave = { _id, title, severity: +severyity, description, lables }
    try {
        const savedGig = await gigService.update(gigToSave, req.loggedinUser)
        res.send(savedGig)
    } catch (err) {
        res.status(400).send(`Couldn't save gig ${err}`)
    }
}

// Get 
export async function getGig(req, res) {
    var { gigId } = req.params
    let visitedGigs = [];

    try {
        const visitedGigsCookie = req.cookies.visitedGigs;
        if (visitedGigsCookie) {
            visitedGigs = JSON.parse(visitedGigsCookie);
        }

        if (visitedGigs.length >= MAX_GIG_VISITED) return res.status(401).send('Wait for a bit')



        // Add the gig to the visitedGigs array
        if (!visitedGigs.includes(gigId)) {
            visitedGigs.push(gigId);
        }
        console.log("User visited at the following gigs:", visitedGigs)
        const gig = await gigService.getById(gigId, req.loggedinUser)
        res.cookie('visitedGigs', JSON.stringify(visitedGigs), { maxAge: 7 * 1000 });
        res.send(gig)

    } catch (error) {
        res.status(400).send(`Couldn't get gig`)
    }

}

// Delete
export async function removeGig(req, res) {
    var { gigId } = req.params

    try {
        await gigService.remove(gigId, req.loggedinUser)
        res.send(`Gig ${gigId} removed`)
    } catch (err) {
        res.status(400).send(`Couldn't remove gig...`)
    }
}