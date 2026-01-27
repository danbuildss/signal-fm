import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export interface Podcast {
  id: string
  podcast_name: string
  host_name: string
  skill_level: 'Noob' | 'Intermediate' | 'Advanced' | 'Giga Brain'
  podcast_type: 'Micro Pod' | 'Macro Pod' | 'Signal Pod' | 'Story Pod' | 'News Pod'
  topics: string[]
  description: string
  x_link: string | null
  youtube_link: string | null
  spotify_link: string | null
  website_link: string | null
  artwork_url: string | null
}

export interface Submission {
  podcast_name: string
  host_name: string
  skill_level: string
  podcast_type: string
  topics: string[]
  description: string
  x_link?: string
  youtube_link?: string
  spotify_link?: string
  website_link?: string
  submitted_by_email: string
}

// Fetch all podcasts
export async function getPodcasts(): Promise<Podcast[]> {
  const { data, error } = await supabase
    .from('podcasts')
    .select('*')
    .order('podcast_name')
  
  if (error) {
    console.error('Error fetching podcasts:', error)
    return []
  }
  
  return data || []
}

// Submit a new podcast
export async function submitPodcast(submission: Submission): Promise<boolean> {
  const { error } = await supabase
    .from('submissions')
    .insert([submission])
  
  if (error) {
    console.error('Error submitting podcast:', error)
    return false
  }
  
  return true
}