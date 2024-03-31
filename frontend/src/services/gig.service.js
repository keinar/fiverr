
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

import Axios from 'axios'

var axios = Axios.create({
    withCredentials: true,
})

const BASE_URL = (process.env.NODE_ENV !== 'development') ?
    '/api/gig/' :
    '//localhost:3031/api/gig/'
const STORAGE_KEY = 'gig'

export const gigService = {
    query,
    getById,
    save,
    remove,
    getEmptyGig,
    addGigMsg,
    getDefaultFilter,
    getFilterFromParams
}
window.cs = gigService


async function query(filterBy = {}) {
    //return httpService.get(STORAGE_KEY, filterBy)
    var { data: gigs } = await axios.get(BASE_URL,{ params: filterBy }) 
    return gigs
}

async function getById(gigId) {
    
    const url = BASE_URL + gigId

    var { data: gig } = await axios.get(url)
    return gig
}

async function remove(gigId) {
    return httpService.delete(`gig/${gigId}`)
}
async function save(gig) {
    var savedGig
    if (gig._id) {
        savedGig = await httpService.put(`gig/${gig._id}`, gig)

    } else {
        savedGig = await httpService.post('gig', gig)
    }
    return savedGig
}

async function addGigMsg(gigId, txt) {
    const savedMsg = await httpService.post(`gig/${gigId}/msg`, {txt})
    return savedMsg
}


function getEmptyGig() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}
// Catagorey DATA
export const gigCategories = [
    {
      name: 'Web Development',
      subcategories: ['Front-end Development', 'Back-end Development', 'Full-stack Development', 'UI/UX Design', 'Responsive Design', 'Web Security', 'E-commerce Development', 'CMS Development', 'Website Maintenance', 'Website Redesign']
    },
    {
      name: 'Graphic Design',
      subcategories: ['Logo Design', 'Brand Identity', 'Print Design', 'Illustration', 'Packaging Design', 'Infographics', 'Social Media Graphics', 'Motion Graphics', 'Brochure Design', 'Poster Design']
    },
    {
      name: 'Digital Marketing',
      subcategories: ['SEO (Search Engine Optimization)', 'Social Media Marketing', 'Content Marketing', 'Email Marketing', 'PPC (Pay-per-Click) Advertising', 'Affiliate Marketing', 'Online Reputation Management', 'Marketing Analytics', 'Influencer Marketing', 'Video Marketing']
    },
    {
      name: 'Writing & Translation',
      subcategories: ['Copywriting', 'Content Writing', 'Blog Writing', 'Technical Writing', 'Creative Writing', 'Translation', 'Proofreading', 'Editing', 'Resume Writing', 'Transcription']
    },
    {
      name: 'Video & Animation',
      subcategories: ['Video Editing', 'Animation', 'Motion Graphics', 'Explainer Videos', 'Whiteboard Animation', 'Product Animation', 'Logo Animation', 'Short Films', 'Video Production', 'Subtitles & Captions']
    },
    {
      name: 'Music & Audio',
      subcategories: ['Music Production', 'Audio Editing', 'Sound Design', 'Voice Over', 'Podcast Editing', 'Audio Mixing', 'Jingles & Intros', 'Original Compositions', 'Singer-Songwriter', 'Remixing & Mashups']
    },
    {
      name: 'Programming & Tech',
      subcategories: ['Mobile App Development', 'Game Development', 'Software Development', 'Database Design', 'API Development', 'Scripting & Automation', 'IT Support', 'Network Administration', 'Cybersecurity', 'Web Scraping']
    },
    {
      name: 'Business',
      subcategories: ['Business Planning', 'Market Research', 'Financial Consulting', 'Legal Consulting', 'Business Analysis', 'Virtual Assistant', 'Project Management', 'Business Support', 'Business Coaching', 'HR Consulting']
    },
    {
      name: 'Data Science & Analytics',
      subcategories: ['Data Analysis', 'Machine Learning', 'Data Visualization', 'Big Data', 'Statistical Analysis', 'Predictive Modeling', 'Quantitative Research', 'Data Engineering', 'Data Mining', 'Text Analytics']
    },
    {
      name: 'Sales & Marketing',
      subcategories: ['Sales Strategy', 'Lead Generation', 'Email Campaigns', 'Cold Calling', 'Sales Funnel Optimization', 'Market Research', 'Marketing Strategy', 'Branding Strategy', 'Sales Presentations', 'Customer Retention']
    }
  ]
function getDefaultFilter() {
    return {
      tags: [],
      txt: ''
    }
  }


function getFilterFromParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
  
    for (const field in defaultFilter) {
      const fieldValue = searchParams.get(field)
  
      if (field === "tags") {
        // Convert tags to an array
        filterBy[field] = fieldValue ? fieldValue.split(",") : defaultFilter[field]
      } else {
        // Keep other parameters as they are
        filterBy[field] = fieldValue || defaultFilter[field]
      }
    }
  
    return filterBy
  }





