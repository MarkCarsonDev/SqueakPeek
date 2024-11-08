import { SupabaseClient, PostgrestError } from '@supabase/supabase-js';
import { createSupabaseClient } from '@/lib/supabase/client';
import { Profile } from '@/lib/store/profile';
import { Application } from '@/lib/store/track';

export async function FetchApplication(
  profile: Profile,
  supabase: SupabaseClient = createSupabaseClient(),
): Promise<{ data: Application[] | null; error: PostgrestError | null }> {
  // Fetch all applications for the profile with their corresponding thread_id
  const { data: applications, error: applicationsError } = await supabase
    .from('application')
    .select(`*, 
      application:opportunity!opportunity_id(opportunity_id, company_thread:company_thread!opportunity_id(thread_id))
      
      `)
    .eq('profile_id', profile.profile_id)
    .order('order', { ascending: true });
  if (applications)
    // console.log(applications[0].application.company_thread.thread_id);
    console.log(applications);
  if (applicationsError) {
    console.error('Error fetching applications:', applicationsError.message);
    return { data: null, error: applicationsError };
  }

  if (!applications) {
    return { data: null, error: null };
  }


  return { data: applications, error: null };
}

// Promise<{ data: (Application & { thread_id: string | null })[] | null; error: PostgrestError | null }>

  // Map the applications to include the thread_id at the top level
  // interface ApplicationWithThread extends Application {
  //   thread_id: string | null;
  // }

  // const applicationsWithThread: ApplicationWithThread[] = applications.map((application: any) => {
  //   const thread_id = application.opportunity?.company_thread?.thread_id || null;
  //   console.log('thread_id', thread_id);
  //   return { ...application, thread_id };
  // });
  // console.log('applicationsWithThread', applicationsWithThread);

// import {SupabaseClient, PostgrestError} from '@supabase/supabase-js';
// import {createSupabaseClient} from '@/lib/supabase/client';
// import {Profile} from '@/lib/store/profile';
// import {Application} from '@/lib/store/track';

// export async function FetchApplication(
//     profile: Profile,
//     supabase: SupabaseClient = createSupabaseClient(),
// ): Promise<{data: Application[] | null, error: PostgrestError | null}> {
//     // Fetch all applications for the profile
//   const {data: applications, error: applicationsError} = await supabase
//       .from('application')
//       .select('*')
//       .eq('profile_id', profile.profile_id)
//       .order('order', {ascending: true});

//   if (applicationsError) {
//     console.error('Error fetching applications:', applicationsError.message);
//     return {data: null, error: applicationsError};
//   }

//   return {data: applications as Application[], error: null};
// }