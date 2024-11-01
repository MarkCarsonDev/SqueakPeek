import { v4 as uuidv4 } from "uuid";
import { createSupabaseClient } from "@/lib/supabase/client";
import { Database } from "@/lib/types/database.types";

type ApplicationRow = Database["public"]["Tables"]["application"]["Row"];
type OpportunityRow = Database["public"]["Tables"]["opportunity"]["Row"];
type ProfileRow = Database["public"]["Tables"]["profile"]["Row"];
type OpportunityType = Database["public"]["Enums"]["OpportunityType"];
type ApplicationStatus = Database["public"]["Enums"]["ApplicationStatus"];

async function findOpportunity(
    roleTitle: string,
    companyName: string,
    type: string
  ): Promise<OpportunityRow | null> {
    const supabase = createSupabaseClient();
  
    const { data: opportunity_exist, error } = await supabase
      .from("opportunity")
      .select("opportunity_id, company_name, created_at, role_title, type")
      .eq("role_title", roleTitle)
      .eq("company_name", companyName)
      .eq("type", type);
  
    if (opportunity_exist && opportunity_exist.length > 0) {
      return opportunity_exist[0];
    }
  
    if (error) {
      console.error("Error finding opportunity:", error.message);
      return null;
    }
  
    // Generate a new opportunity ID if it doesn't exist
    const opportunity_id_created = uuidv4();
    
    // Define the new opportunity object
    const newOpportunity: Omit<OpportunityRow, "created_at"> = {
      opportunity_id: opportunity_id_created,
      role_title: roleTitle,
      company_name: companyName,
      type: type as OpportunityType,
    //   date_posted: null,
    };
  
    const { data: insertOpportunity, error: insertOpportunityError } = await supabase
      .from("opportunity")
      .insert([newOpportunity])
      .select("opportunity_id");  // Explicitly select fields to avoid type inference issues
  
    if (insertOpportunityError) {
      console.log("Error creating new opportunity:", insertOpportunityError.message);
      return null;
    }
  
    if (insertOpportunity && insertOpportunity.length > 0) {
      console.log("Opportunity created:", insertOpportunity[0].opportunity_id);
    }
  
    // Return the newly created opportunity
    return {
      opportunity_id: opportunity_id_created,
      role_title: roleTitle,
      company_name: companyName,
      type: type as OpportunityType,
      created_at: new Date().toISOString(),
    //   date_posted: null,
    };
  }


export async function InsertApplication(
    application: ApplicationRow,
    profile: ProfileRow
  ): Promise<ApplicationRow | null> {
    const supabase = createSupabaseClient();
  
    // Find the opportunity
    const opportunity = await findOpportunity(
      application.role_title,
      application.company_name,
      application.type
    );
  
    if (!opportunity) {
      console.error("Opportunity not found");
      return null;
    }
  
    // Insert the application
    const newApplication: ApplicationRow = {
      application_id: uuidv4(),
      opportunity_id: opportunity.opportunity_id,
      profile_id:  profile.profile_id,
      role_title: application.role_title,
      company_name: application.company_name,
      type: application.type as OpportunityType,
      status: application.status as ApplicationStatus,
      currentScore: application.currentScore ?? null,
      interviewing_round: application.interviewing_round ?? null,
      link: application.link ?? null,
      location: application.location ?? null,
      created_at: new Date().toISOString(),
      outOfScore: application.outOfScore ?? null,
      status_update_date: null,
      test_provider: application.test_provider ?? null,
    };
  
    const { data: insertApplication, error: insertApplicationError } = await supabase
      .from("application")
      .insert([newApplication])
      .select("application_id");  // Explicitly select fields to avoid type inference issues
  
    if (insertApplicationError) {
      console.error("Error inserting application:", insertApplicationError.message);
      return null;
    }
  
    if (insertApplication && insertApplication.length > 0) {
      console.log("Application inserted:", insertApplication[0].application_id);
    }
  
    // Return the newly created application
    return {
      application_id: newApplication.application_id,
      opportunity_id: newApplication.opportunity_id,
      profile_id: newApplication.profile_id,
      role_title: newApplication.role_title,
      company_name: newApplication.company_name,
      type: newApplication.type,
      status: newApplication.status,
      currentScore: newApplication.currentScore,
      interviewing_round: newApplication.interviewing_round,
      link: newApplication.link,
      location: newApplication.location,
      status_update_date: null,
      created_at: new Date().toISOString(),
      outOfScore: application.outOfScore ?? null,
      test_provider: application.test_provider ?? null,
    };
  }