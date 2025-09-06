import { supabase } from '../lib/supabase';
import genAI from './geminiClient';

// Resume Analysis Service with Real AI Integration
class ResumeAnalysisService {
  // Create a new job posting
  async createJobPosting(jobData) {
    try {
      const { data, error } = await supabase?.from('job_postings')?.insert({
          title: jobData?.title,
          company: jobData?.company,
          description: jobData?.description,
          requirements: jobData?.requirements,
          location: jobData?.location,
          salary_range: jobData?.salaryRange,
          user_id: (await supabase?.auth?.getUser())?.data?.user?.id
        })?.select()?.single();

      return { data, error };
    } catch (error) {
      return { error: { message: 'Network error. Please try again.' } };
    }
  }

  // Get user's job postings
  async getUserJobPostings() {
    try {
      const { data, error } = await supabase?.from('job_postings')?.select('*')?.order('created_at', { ascending: false });

      return { data: data || [], error };
    } catch (error) {
      return { data: [], error: { message: 'Network error. Please try again.' } };
    }
  }

  // Upload resume file
  async uploadResume(file, userId) {
    try {
      const fileExt = file?.name?.split('.')?.pop();
      const fileName = `${userId}/resume_${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase?.storage
        ?.from('resumes')
        ?.upload(fileName, file, { 
          upsert: true,
          metadata: {
            originalName: file?.name
          }
        });

      if (error) throw error;
      return { data: fileName, error: null };
    } catch (error) {
      return { error: { message: 'Failed to upload resume. Please try again.' } };
    }
  }

  // Create resume analysis
  async createResumeAnalysis(analysisData) {
    try {
      const { data, error } = await supabase?.from('resume_analyses')?.insert({
          job_posting_id: analysisData?.jobPostingId,
          job_title: analysisData?.jobTitle,
          company: analysisData?.company,
          resume_file_path: analysisData?.resumeFilePath,
          analysis_status: 'pending',
          user_id: (await supabase?.auth?.getUser())?.data?.user?.id
        })?.select()?.single();

      return { data, error };
    } catch (error) {
      return { error: { message: 'Network error. Please try again.' } };
    }
  }

  // Update analysis with results
  async updateAnalysisResults(analysisId, results) {
    try {
      const { data, error } = await supabase?.from('resume_analyses')?.update({
          overall_score: results?.overallScore,
          analysis_status: 'completed',
          analysis_results: results?.analysisResults,
          suggestions: results?.suggestions
        })?.eq('id', analysisId)?.select()?.single();

      return { data, error };
    } catch (error) {
      return { error: { message: 'Network error. Please try again.' } };
    }
  }

  // Get user's resume analyses
  async getUserAnalyses() {
    try {
      const { data, error } = await supabase?.from('resume_analyses')?.select(`
          *,
          job_posting:job_postings(title, company)
        `)?.order('created_at', { ascending: false });

      return { data: data || [], error };
    } catch (error) {
      return { data: [], error: { message: 'Network error. Please try again.' } };
    }
  }

  // Get analysis by ID with all details
  async getAnalysisDetails(analysisId) {
    try {
      const { data: analysis, error: analysisError } = await supabase?.from('resume_analyses')?.select(`
          *,
          job_posting:job_postings(*)
        `)?.eq('id', analysisId)?.single();

      if (analysisError) return { error: analysisError };

      // Get skills analysis
      const { data: skills, error: skillsError } = await supabase?.from('skills_analysis')?.select('*')?.eq('analysis_id', analysisId)?.order('skill_name');

      // Get keyword analysis
      const { data: keywords, error: keywordsError } = await supabase?.from('keyword_analysis')?.select('*')?.eq('analysis_id', analysisId)?.order('importance_score', { ascending: false });

      // Get formatting issues
      const { data: formatting, error: formattingError } = await supabase?.from('formatting_issues')?.select('*')?.eq('analysis_id', analysisId)?.order('severity', { ascending: false });

      const combinedData = {
        ...analysis,
        skills: skills || [],
        keywords: keywords || [],
        formatting_issues: formatting || []
      };

      return { data: combinedData, error: null };
    } catch (error) {
      return { error: { message: 'Network error. Please try again.' } };
    }
  }

  // Add skills analysis data
  async addSkillsAnalysis(analysisId, skillsData) {
    try {
      const skillsToInsert = skillsData?.map(skill => ({
        analysis_id: analysisId,
        skill_name: skill?.name,
        is_present: skill?.isPresent,
        is_required: skill?.isRequired,
        match_level: skill?.matchLevel,
        suggestions: skill?.suggestions
      }));

      const { data, error } = await supabase?.from('skills_analysis')?.insert(skillsToInsert)?.select();

      return { data, error };
    } catch (error) {
      return { error: { message: 'Network error. Please try again.' } };
    }
  }

  // Add keyword analysis data
  async addKeywordAnalysis(analysisId, keywordsData) {
    try {
      const keywordsToInsert = keywordsData?.map(keyword => ({
        analysis_id: analysisId,
        keyword: keyword?.keyword,
        frequency_in_resume: keyword?.resumeFreq,
        frequency_in_job: keyword?.jobFreq,
        importance_score: keyword?.importance
      }));

      const { data, error } = await supabase?.from('keyword_analysis')?.insert(keywordsToInsert)?.select();

      return { data, error };
    } catch (error) {
      return { error: { message: 'Network error. Please try again.' } };
    }
  }

  // Add formatting issues
  async addFormattingIssues(analysisId, issuesData) {
    try {
      const issuesToInsert = issuesData?.map(issue => ({
        analysis_id: analysisId,
        issue_type: issue?.type,
        description: issue?.description,
        severity: issue?.severity,
        suggestion: issue?.suggestion
      }));

      const { data, error } = await supabase?.from('formatting_issues')?.insert(issuesToInsert)?.select();

      return { data, error };
    } catch (error) {
      return { error: { message: 'Network error. Please try again.' } };
    }
  }

  // Submit feedback
  async submitFeedback(analysisId, rating, feedbackText) {
    try {
      const { data, error } = await supabase?.from('analysis_feedback')?.insert({
          analysis_id: analysisId,
          rating,
          feedback_text: feedbackText,
          user_id: (await supabase?.auth?.getUser())?.data?.user?.id
        })?.select()?.single();

      return { data, error };
    } catch (error) {
      return { error: { message: 'Network error. Please try again.' } };
    }
  }

  // Get resume download URL
  async getResumeDownloadUrl(filePath) {
    try {
      const { data, error } = await supabase?.storage
        ?.from('resumes')
        ?.createSignedUrl(filePath, 3600); // 1 hour expiry

      return { data: data?.signedUrl, error };
    } catch (error) {
      return { error: { message: 'Network error. Please try again.' } };
    }
  }

  // Delete analysis
  async deleteAnalysis(analysisId) {
    try {
      const { error } = await supabase?.from('resume_analyses')?.delete()?.eq('id', analysisId);

      return { error };
    } catch (error) {
      return { error: { message: 'Network error. Please try again.' } };
    }
  }

  // Get user analytics/stats
  async getUserStats() {
    try {
      const { data: analysesCount, error: countError } = await supabase?.from('resume_analyses')?.select('id', { count: 'exact' });

      const { data: avgScore, error: scoreError } = await supabase?.from('resume_analyses')?.select('overall_score')?.not('overall_score', 'is', null);

      const averageScore = avgScore?.length > 0 
        ? Math.round(avgScore?.reduce((sum, item) => sum + (item?.overall_score || 0), 0) / avgScore?.length)
        : 0;

      const stats = {
        totalAnalyses: analysesCount?.length || 0,
        averageScore,
        analysesRemaining: null // Will be fetched from user profile
      };

      return { data: stats, error: null };
    } catch (error) {
      return { error: { message: 'Network error. Please try again.' } };
    }
  }

  // Real-time subscription for analysis updates
  subscribeToAnalysisUpdates(analysisId, callback) {
    const channel = supabase?.channel(`analysis-${analysisId}`)?.on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'resume_analyses',
          filter: `id=eq.${analysisId}`
        },
        (payload) => {
          callback?.(payload?.new);
        }
      )?.subscribe();

    return channel;
  }

  // Unsubscribe from real-time updates
  unsubscribeFromUpdates(channel) {
    if (channel) {
      supabase?.removeChannel(channel);
    }
  }
}

export const resumeAnalysisService = new ResumeAnalysisService();

// File processing utilities
const processResumeFile = async (file) => {
  if (!file) return null;
  
  try {
    const text = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });
    return text;
  } catch (error) {
    console.error('Error processing file:', error);
    throw new Error('Failed to process resume file');
  }
};

// Real AI-powered resume analysis function
export async function analyzeResumeCompatibility(resumeInput, jobDescription) {
  try {
    // Validate inputs
    if (!resumeInput || !jobDescription) {
      throw new Error('Resume and job description are required for analysis');
    }

    // Check API key
    if (!import.meta.env?.VITE_GEMINI_API_KEY || import.meta.env?.VITE_GEMINI_API_KEY === 'your-gemini-api-key-here') {
      throw new Error('Gemini API key is not configured');
    }

    // Process resume input (file or text)
    let resumeText;
    if (typeof resumeInput === 'string') {
      resumeText = resumeInput;
    } else if (resumeInput instanceof File) {
      resumeText = await processResumeFile(resumeInput);
    } else {
      throw new Error('Invalid resume input format');
    }

    // Initialize Gemini model
    const model = genAI?.getGenerativeModel({ 
      model: 'gemini-1.5-pro',
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 4096,
      }
    });

    // Create comprehensive analysis prompt
    const analysisPrompt = `
You are an expert ATS (Applicant Tracking System) and HR professional. Analyze the resume against the job description and provide a comprehensive compatibility report.

**Job Description:**
${jobDescription}

**Resume:**
${resumeText}

Please analyze and respond with a valid JSON object containing:

{
  "matchScore": number (0-100 overall compatibility percentage),
  "summary": "Brief 2-3 sentence summary of the match",
  "skillsAnalysis": {
    "matchedSkills": [
      {
        "skill": "skill name",
        "present": true,
        "required": true,
        "match": "exact|partial|missing",
        "yearsExperience": number,
        "proficiency": "Beginner|Intermediate|Advanced|Expert"
      }
    ],
    "missingSkills": [
      {
        "skill": "skill name",
        "importance": "high|medium|low",
        "suggestion": "how to address this gap"
      }
    ]
  },
  "keywords": [
    {
      "keyword": "keyword",
      "resumeFreq": number,
      "jobFreq": number,
      "importance": number (1-10)
    }
  ],
  "sections": {
    "jobTitle": {
      "score": number (0-100),
      "match": "exact|close|different",
      "suggestion": "improvement suggestion"
    },
    "education": {
      "score": number (0-100),
      "meets": true/false,
      "details": "explanation"
    },
    "experience": {
      "score": number (0-100),
      "relevantYears": number,
      "suggestion": "how to improve"
    }
  },
  "formatting": [
    {
      "issue": "formatting issue description",
      "severity": "high|medium|low",
      "suggestion": "how to fix"
    }
  ],
  "recommendations": [
    "specific actionable recommendation 1",
    "specific actionable recommendation 2",
    "specific actionable recommendation 3"
  ],
  "atsCompatibility": {
    "score": number (0-100),
    "issues": ["list of ATS issues"],
    "strengths": ["list of ATS strengths"]
  }
}

Be specific, actionable, and focus on improving the candidate's chances. Ensure all scores are realistic and based on actual content analysis.`;

    // Get AI analysis
    const result = await model?.generateContent(analysisPrompt);
    const response = await result?.response;
    const responseText = response?.text();

    // Parse JSON response
    let analysisData;
    try {
      // Clean response text to extract JSON
      const jsonMatch = responseText?.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in AI response');
      }
      
      analysisData = JSON.parse(jsonMatch?.[0]);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      throw new Error('Failed to parse analysis results from AI');
    }

    // Validate and structure the response
    const structuredResult = {
      matchScore: Math.min(100, Math.max(0, analysisData?.matchScore || 0)),
      summary: analysisData?.summary || 'Analysis completed successfully',
      skillsAnalysis: analysisData?.skillsAnalysis || { matchedSkills: [], missingSkills: [] },
      keywords: analysisData?.keywords || [],
      sections: {
        jobTitle: analysisData?.sections?.jobTitle || { score: 0, match: 'different', suggestion: '' },
        education: analysisData?.sections?.education || { score: 0, meets: false, details: '' },
        experience: analysisData?.sections?.experience || { score: 0, relevantYears: 0, suggestion: '' }
      },
      formatting: analysisData?.formatting || [],
      recommendations: analysisData?.recommendations || [],
      atsCompatibility: analysisData?.atsCompatibility || { score: 0, issues: [], strengths: [] },
      timestamp: new Date()?.toISOString(),
      modelUsed: 'gemini-1.5-pro'
    };

    return structuredResult;

  } catch (error) {
    console.error('Resume analysis error:', error);
    
    // Provide meaningful error messages
    if (error?.message?.includes('API key')) {
      throw new Error('AI service not configured. Please check your API key settings.');
    } else if (error?.message?.includes('quota') || error?.message?.includes('rate limit')) {
      throw new Error('AI service temporarily unavailable due to rate limits. Please try again later.');
    } else if (error?.message?.includes('network') || error?.message?.includes('fetch')) {
      throw new Error('Network error. Please check your connection and try again.');
    } else {
      throw new Error(`Analysis failed: ${error?.message || 'Unknown error occurred'}`);
    }
  }
}