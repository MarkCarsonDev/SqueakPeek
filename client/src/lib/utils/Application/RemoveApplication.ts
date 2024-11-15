import {SupabaseClient, PostgrestError} from '@supabase/supabase-js';
import {Profile} from '../../store/profile';
import {createSupabaseClient} from '../../supabase/client';

export async function RemoveApplication(
    profile: Profile,
    applicationId: string,
    supabase: SupabaseClient = createSupabaseClient()
): Promise<{ success: string | null; error: PostgrestError | null }> {
    const {data, error} = await supabase
        .from('application')
        .delete()
        .eq('application_id', applicationId)
        .eq('profile_id', profile.profile_id);

    if (error) {
        console.error('Error removing application:', error.message);
        return {success: null, error};
    }

    if (data) {
        return {success: 'Application removed successfully', error: null};
    } else {
        console.error('Error: No data returned');
        return {success: null, error: {message: 'No data returned'} as PostgrestError};
    }
}