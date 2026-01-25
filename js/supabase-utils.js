// FieldVoice Pro - Supabase Data Converters
// Converts between Supabase row format and JS object format
// Single source of truth - do not duplicate these functions in HTML files

// ============ PROJECT CONVERTERS ============

/**
 * Convert Supabase project row to JS format
 */
function fromSupabaseProject(row) {
    return {
        id: row.id,
        name: row.project_name || '',
        noabProjectNo: row.noab_project_no || '',
        cnoSolicitationNo: row.cno_solicitation_no || 'N/A',
        location: row.location || '',
        engineer: row.engineer || '',
        primeContractor: row.prime_contractor || '',
        noticeToProceed: row.notice_to_proceed || '',
        contractDuration: row.contract_duration || '',
        weatherDays: row.weather_days || 0,
        expectedCompletion: row.expected_completion || '',
        defaultStartTime: row.default_start_time || '06:00',
        defaultEndTime: row.default_end_time || '16:00',
        logo: row.logo || null,
        status: row.status || 'active',
        contractors: [],
        equipment: []
    };
}

/**
 * Convert JS project object to Supabase format
 */
function toSupabaseProject(project) {
    return {
        id: project.id,
        project_name: project.name || '',
        noab_project_no: project.noabProjectNo || '',
        cno_solicitation_no: project.cnoSolicitationNo || 'N/A',
        location: project.location || '',
        engineer: project.engineer || '',
        prime_contractor: project.primeContractor || '',
        notice_to_proceed: project.noticeToProceed || null,
        contract_duration: project.contractDuration || null,
        weather_days: project.weatherDays || 0,
        expected_completion: project.expectedCompletion || null,
        default_start_time: project.defaultStartTime || '06:00',
        default_end_time: project.defaultEndTime || '16:00',
        logo: project.logo || null,
        status: project.status || 'active',
        updated_at: new Date().toISOString()
    };
}

// ============ CONTRACTOR CONVERTERS ============

/**
 * Convert Supabase contractor row to JS format
 */
function fromSupabaseContractor(row) {
    return {
        id: row.id,
        name: row.name || '',
        abbreviation: row.abbreviation || '',
        type: row.type || 'subcontractor',
        trades: Array.isArray(row.trades) ? row.trades.join('; ') : (row.trades || ''),
        status: row.status || 'active',
        addedDate: row.added_date || null,
        removedDate: row.removed_date || null
    };
}

/**
 * Convert JS contractor object to Supabase format
 */
function toSupabaseContractor(contractor, projectId) {
    return {
        id: contractor.id,
        project_id: projectId,
        name: contractor.name || '',
        abbreviation: contractor.abbreviation || '',
        type: contractor.type || 'subcontractor',
        trades: contractor.trades ? contractor.trades.split(';').map(t => t.trim()).filter(t => t) : [],
        status: contractor.status || 'active',
        added_date: contractor.addedDate || null,
        removed_date: contractor.removedDate || null,
        updated_at: new Date().toISOString()
    };
}

// ============ EQUIPMENT CONVERTERS ============

/**
 * Convert Supabase equipment row to JS format
 */
function fromSupabaseEquipment(row) {
    return {
        id: row.id,
        contractorId: row.contractor_id,
        type: row.type || '',
        model: row.model || '',
        identifier: row.identifier || null,
        status: row.status || 'active',
        addedDate: row.added_date || null,
        removedDate: row.removed_date || null
    };
}

/**
 * Convert JS equipment object to Supabase format
 */
function toSupabaseEquipment(equipment, projectId) {
    return {
        id: equipment.id,
        project_id: projectId,
        contractor_id: equipment.contractorId,
        type: equipment.type || '',
        model: equipment.model || '',
        identifier: equipment.identifier || null,
        status: equipment.status || 'active',
        added_date: equipment.addedDate || null,
        removed_date: equipment.removedDate || null,
        updated_at: new Date().toISOString()
    };
}

// ============ REPORT CONVERTERS ============

/**
 * Convert report to Supabase format for the reports table
 * Note: userSettings must be available in the calling context
 */
function toSupabaseReport(report, projectId, userSettings) {
    return {
        project_id: projectId,
        report_date: new Date().toISOString().split('T')[0],
        inspector_name: report.overview?.completedBy || userSettings?.full_name || '',
        status: report.meta?.status || 'draft',
        updated_at: new Date().toISOString()
    };
}

/**
 * Convert raw capture data to Supabase format
 */
function toSupabaseRawCapture(report, reportId) {
    return {
        report_id: reportId,
        capture_mode: report.meta?.captureMode || 'guided',
        freeform_notes: report.fieldNotes?.freeformNotes || '',
        work_summary: report.guidedNotes?.workSummary || '',
        issues_notes: report.generalIssues?.join('\n') || '',
        safety_notes: report.safety?.notes?.join('\n') || '',
        weather_data: report.overview?.weather || {},
        captured_at: new Date().toISOString()
    };
}

/**
 * Convert contractor work to Supabase format
 */
function toSupabaseContractorWork(activity, reportId) {
    return {
        report_id: reportId,
        contractor_id: activity.contractorId,
        no_work_performed: activity.noWork || false,
        narrative: activity.narrative || '',
        equipment_used: activity.equipmentUsed || '',
        crew: activity.crew || ''
    };
}

/**
 * Convert personnel data to Supabase format
 */
function toSupabasePersonnel(ops, reportId) {
    return {
        report_id: reportId,
        contractor_id: ops.contractorId,
        superintendents: ops.superintendents || 0,
        foremen: ops.foremen || 0,
        operators: ops.operators || 0,
        laborers: ops.laborers || 0,
        surveyors: ops.surveyors || 0,
        others: ops.others || 0
    };
}

/**
 * Convert equipment usage to Supabase format
 */
function toSupabaseEquipmentUsage(equip, reportId) {
    return {
        report_id: reportId,
        equipment_id: equip.equipmentId,
        status: equip.hoursUtilized === null ? 'idle' : 'active',
        hours_used: equip.hoursUtilized || 0,
        notes: ''
    };
}

/**
 * Convert photo to Supabase format
 */
function toSupabasePhoto(photo, reportId) {
    return {
        report_id: reportId,
        storage_path: photo.storagePath || '',
        filename: photo.fileName || photo.id,
        caption: photo.caption || '',
        gps_lat: photo.gps?.lat || null,
        gps_lng: photo.gps?.lng || null,
        taken_at: photo.timestamp || new Date().toISOString(),
        created_at: new Date().toISOString()
    };
}
