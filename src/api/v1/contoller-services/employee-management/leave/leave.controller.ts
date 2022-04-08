import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, { ValidationResult } from "../../../common/common-methods";
import {
  AddLeaveReasonAttachmentViewmodel,
  AddLeaveViewmodel,
  DeleteLeaveRequestViewmodel,
  GetLeaveDetailsViewmodel,
  GetLeaveListByAdminViewmodel,
  LeaveApprovalViewmodel,
  LeaveHistoryAllEmployeeViewmodel,
  LeaveHistoryViewmodel,
  UpdateLeaveViewmodel
} from "../../../view-models/employee-management-viewmodels/leave";
import {
  AddLeaveDeductionCategoryViewmodel,
  DeleteLeaveDeductionCategoryViewmodel,
  GetLeaveDeductionCategoryViewmodel,
  UpdateLeaveDeductionCategoryViewmodel
} from "../../../view-models/employee-management-viewmodels/leave/leave-deduction/index";
import {
  AddLeaveReasonViewmodel,
  DeleteLeaveReasonViewmodel,
  UpdateLeaveReasonViewmodel
} from "../../../view-models/employee-management-viewmodels/leave/leave-reason";
import {
  AddLeaveStatusViewmodel,
  DeleteLeaveStatusViewmodel,
  UpdateLeaveStatusViewmodel
} from "../../../view-models/employee-management-viewmodels/leave/leave-status";
import {
  AddLeaveTypeViewmodel,
  DeleteLeaveTypeViewmodel,
  GetLeaveTypeDetailsViewmodel,
  UpdateLeaveTypeViewmodel
} from "../../../view-models/employee-management-viewmodels/leave/leave-type/index";
import leaveService from "../leave/leave.service";

class Leave_Controller {
  //Request Leave
  public addLeave = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddLeaveViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error,
        });
      } else {
        let model: AddLeaveViewmodel =
          conversionResult.data as AddLeaveViewmodel;
        let leaveResult = await leaveService.AddLeave(req, model);
       
          return res.status(leaveResult.status_code).json({
            status_code: leaveResult.status_code,
            success: leaveResult.success,
            data: leaveResult.data,
          });
        
      }
    } catch (error) {
      next(error);
    }
  };
  public updateLeave = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdateLeaveViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error,
        });
      } else {
        let model: UpdateLeaveViewmodel =
          conversionResult.data as UpdateLeaveViewmodel;
        let leaveResult = await leaveService.UpdateLeave(req, model);
        
          return res.status(leaveResult.status_code).json({
            status_code: leaveResult.status_code,
            success: leaveResult.success,
            data: leaveResult.data,
          });
       
      }
    } catch (error) {
      next(error);
    }
  };
  public deleteLeave = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        DeleteLeaveRequestViewmodel,
        JSON.parse(`{"_id":"${req.params._id}"}`)
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error,
        });
      } else {
        let leaveResult = await leaveService.DeleteLeave(req);
       
          return res.status(leaveResult.status_code).json({
            status_code: leaveResult.status_code,
            success: leaveResult.success,
            data: leaveResult.data,
          });
       
      }
    } catch (error) {
      next(error);
    }
  };

  public GetLeaveDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetLeaveDetailsViewmodel,
        JSON.parse(`{"_id":"${req.params._id}"}`)
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error,
        });
      } else {
        let leaveResult = await leaveService.GetLeaveDetails(req);
       
          return res.status(leaveResult.status_code).json({
            status_code: leaveResult.status_code,
            success: leaveResult.success,
            data: leaveResult.data,
          });
     
      }
    } catch (error) {
      next(error);
    }
  };

  public approveLeaveOrRejectLeave = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        LeaveApprovalViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error,
        });
      } else {
        let model: LeaveApprovalViewmodel =
          conversionResult.data as LeaveApprovalViewmodel;

        let leaveApprovalResult = await leaveService.ApproveLeaveOrRejectLeave(
          req,
          model
        );
        
          return res.status(leaveApprovalResult.status_code).json({
            status_code: leaveApprovalResult.status_code,
            success: leaveApprovalResult.success,
            data: leaveApprovalResult.data,
          });
        
      }
    } catch (error) {
      next(error);
    }
  };
  public leaveHistory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        LeaveHistoryViewmodel,
        JSON.parse(`{"employee_id":"${req.params.employee_id}"}`)
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error,
        });
      } else {
        let leaveHistoryResult = await leaveService.LeaveHistory(req);
        return res.status(leaveHistoryResult.status_code).json({
          status_code: leaveHistoryResult.status_code,
          success: leaveHistoryResult.success,
          data: leaveHistoryResult.data,
        });
      }
    } catch (error) {
      next(error);
    }
  };

  public leaveHistoryAllEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        LeaveHistoryAllEmployeeViewmodel,
        JSON.parse(`{"organization_id":"${req.params.organization_id}"}`)
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error,
        });
      } else {
        let leaveHistoryResult = await leaveService.LeaveHistoryAllEmployee(
          req
        );
      
          return res.status(leaveHistoryResult.status_code).json({
            status_code: leaveHistoryResult.status_code,
            success: leaveHistoryResult.success,
            data: leaveHistoryResult.data,
          });
       
      }
    } catch (error) {
      next(error);
    }
  };

  public uploadLeaveAttachment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddLeaveReasonAttachmentViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error,
        });
      } else {
        let model: AddLeaveReasonAttachmentViewmodel =
          conversionResult.data as AddLeaveReasonAttachmentViewmodel;

        let leaveUpdateResult = await leaveService.UploadLeaveAttachment(
          req,
          model
        );
       
          return res.status(leaveUpdateResult.status_code).json({
            status_code: leaveUpdateResult.status_code,
            success: leaveUpdateResult.success,
            data: leaveUpdateResult.data,
          });
        
      }
    } catch (error) {
      next(error);
    }
  };

  public leaveList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let leaveResult = await leaveService.LeaveList(req);
      
        return res.status(leaveResult.status_code).json({
          status_code: leaveResult.status_code,
          success: leaveResult.success,
          data: leaveResult.data,
        });
     
    } catch (error) {
      next(error);
    }
  };

  public LeaveListByAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetLeaveListByAdminViewmodel,
        JSON.parse(`{"employee_id":"${req.params.employee_id}"}`)
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error,
        });
      } else {
        let leaveResult = await leaveService.LeaveListByAdmin(req);
      
          return res.status(leaveResult.status_code).json({
            status_code: leaveResult.status_code,
            success: leaveResult.success,
            data: leaveResult.data,
          });
        
      }
    } catch (error) {
      next(error);
    }
  };
  public addLeaveType = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddLeaveTypeViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error,
        });
      } else {
        let model: AddLeaveTypeViewmodel =
          conversionResult.data as AddLeaveTypeViewmodel;
        let leaveTypeResult = await leaveService.AddLeaveType(req, model);
        
          return res.status(leaveTypeResult.status_code).json({
            status_code: leaveTypeResult.status_code,
            success: leaveTypeResult.success,
            data: leaveTypeResult.data,
          });
       
      }
    } catch (error) {
      next(error);
    }
  };
  public deleteLeaveType = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        DeleteLeaveTypeViewmodel,
        JSON.parse(`{"leave_type_id":"${req.params.leave_type_id}"}`)
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error,
        });
      } else {
        let leaveTypeResult = await leaveService.DeleteLeaveType(req);
        
          return res.status(leaveTypeResult.status_code).json({
            status_code: leaveTypeResult.status_code,
            success: leaveTypeResult.success,
            data: leaveTypeResult.data,
          });
       
      }
    } catch (error) {
      next(error);
    }
  };

  public getLeaveType = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetLeaveTypeDetailsViewmodel,
        JSON.parse(`{"leave_type_id":"${req.params.leave_type_id}"}`)
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error,
        });
      } else {
        let leaveTypeResult = await leaveService.getLeaveTypeDetails(req);
       
          return res.status(leaveTypeResult.status_code).json({
            status_code: leaveTypeResult.status_code,
            success: leaveTypeResult.success,
            data: leaveTypeResult.data,
          });
        
      }
    } catch (error) {
      next(error);
    }
  };
  public updateLeaveType = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdateLeaveTypeViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error,
        });
      } else {
        let model: UpdateLeaveTypeViewmodel =
          conversionResult.data as UpdateLeaveTypeViewmodel;
        let leaveTypeResult = await leaveService.UpdateLeaveType(req, model);
      
          return res.status(leaveTypeResult.status_code).json({
            status_code: leaveTypeResult.status_code,
            success: leaveTypeResult.success,
            data: leaveTypeResult.data,
          });
        
      }
    } catch (error) {
      next(error);
    }
  };

  public allLeaveTypeList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let leaveTypeListResult = await leaveService.AllLeaveTypeList(req);
      
        return res.status(leaveTypeListResult.status_code).json({
          status_code: leaveTypeListResult.status_code,
          success: leaveTypeListResult.success,
          data: leaveTypeListResult.data,
        });
      
    } catch (error) {
      next(error);
    }
  };

  public addLeaveStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddLeaveStatusViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error,
        });
      } else {
        let model: AddLeaveStatusViewmodel =
          conversionResult.data as AddLeaveStatusViewmodel;
        let leaveStatusResult = await leaveService.AddLeaveStatus(req, model);
       
          return res.status(leaveStatusResult.status_code).json({
            status_code: leaveStatusResult.status_code,
            success: leaveStatusResult.success,
            data: leaveStatusResult.data,
          });
        
      }
    } catch (error) {
      next(error);
    }
  };
  public deleteLeaveStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        DeleteLeaveStatusViewmodel,
        JSON.parse(`{"leave_status_id":"${req.params.leave_status_id}"}`)
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error,
        });
      } else {
        let leaveStatusResult = await leaveService.DeleteLeaveStatus(req);
      
          return res.status(leaveStatusResult.status_code).json({
            status_code: leaveStatusResult.status_code,
            success: leaveStatusResult.success,
            data: leaveStatusResult.data,
          });
       
      }
    } catch (error) {
      next(error);
    }
  };

  public GetLeaveStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        DeleteLeaveStatusViewmodel,
        JSON.parse(`{"leave_status_id":"${req.params.leave_status_id}"}`)
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error,
        });
      } else {
        let leaveStatusResult = await leaveService.GetLeaveStatus(req);
      
          return res.status(leaveStatusResult.status_code).json({
            status_code: leaveStatusResult.status_code,
            success: leaveStatusResult.success,
            data: leaveStatusResult.data,
          });
        
      }
    } catch (error) {
      next(error);
    }
  };
  public updateLeaveStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdateLeaveStatusViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error,
        });
      } else {
        let model: UpdateLeaveStatusViewmodel =
          conversionResult.data as UpdateLeaveStatusViewmodel;
        let leaveStatusResult = await leaveService.UpdateLeaveStatus(
          req,
          model
        );
      
          return res.status(leaveStatusResult.status_code).json({
            status_code: leaveStatusResult.status_code,
            success: leaveStatusResult.success,
            data: leaveStatusResult.data,
          });
       
      }
    } catch (error) {
      next(error);
    }
  };

  public allLeaveStatusList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let leaveStatusListResult = await leaveService.AllLeaveStatusList(req);
      
        return res.status(leaveStatusListResult.status_code).json({
          status_code: leaveStatusListResult.status_code,
          success: leaveStatusListResult.success,
          data: leaveStatusListResult.data,
        });
      
    } catch (error) {
      next(error);
    }
  };

  public addLeaveReason = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddLeaveReasonViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error,
        });
      } else {
        let model: AddLeaveReasonViewmodel =
          conversionResult.data as AddLeaveReasonViewmodel;
        let leaveReasonResult = await leaveService.AddLeaveReason(req, model);
        
          return res.status(leaveReasonResult.status_code).json({
            status_code: leaveReasonResult.status_code,
            success: leaveReasonResult.success,
            data: leaveReasonResult.data,
          });
        
      }
    } catch (error) {
      next(error);
    }
  };
  public deleteLeaveReason = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        DeleteLeaveReasonViewmodel,
        JSON.parse(`{"leave_reason_id":"${req.params.leave_reason_id}"}`)
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error,
        });
      } else {
        let leaveReasonResult = await leaveService.DeleteLeaveReason(req);
        
          return res.status(leaveReasonResult.status_code).json({
            status_code: leaveReasonResult.status_code,
            success: true,
            data: leaveReasonResult.data,
          });
        
      }
    } catch (error) {
      next(error);
    }
  };
  public updateLeaveReason = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdateLeaveReasonViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error,
        });
      } else {
        let model: UpdateLeaveReasonViewmodel =
          conversionResult.data as UpdateLeaveReasonViewmodel;
        let leaveReasonResult = await leaveService.UpdateLeaveReason(
          req,
          model
        );
        
          return res.status(leaveReasonResult.status_code).json({
            status_code: leaveReasonResult.status_code,
            success: leaveReasonResult.success,
            data: leaveReasonResult.data,
          });
        
      }
    } catch (error) {
      next(error);
    }
  };

  public allLeaveReasonList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let leaveReasonListResult = await leaveService.AllLeaveReasonList(req);
      
        return res.status(leaveReasonListResult.status_code).json({
          status_code: leaveReasonListResult.status_code,
          success: leaveReasonListResult.success,
          data: leaveReasonListResult.data,
        });
      
    } catch (error) {
      next(error);
    }
  };

  public AddLeaveDeductionCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddLeaveDeductionCategoryViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error,
        });
      } else {
        let model: AddLeaveDeductionCategoryViewmodel =
          conversionResult.data as AddLeaveDeductionCategoryViewmodel;
        let leaveDeductionResult = await leaveService.AddLeaveDeductionCategory(
          req,
          model
        );
        
          return res.status(leaveDeductionResult.status_code).json({
            status_code: leaveDeductionResult.status_code,
            success: leaveDeductionResult.success,
            data: leaveDeductionResult.data,
          });
        
      }
    } catch (error) {
      next(error);
    }
  };
  public DeleteLeaveDeductionCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        DeleteLeaveDeductionCategoryViewmodel,
        JSON.parse(`{"_id":"${req.params._id}"}`)
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error,
        });
      } else {
        let leaveDeductionResult =
          await leaveService.DeleteLeaveDeductionCategory(req);
       
          return res.status(leaveDeductionResult.status_code).json({
            status_code: leaveDeductionResult.status_code,
            success: leaveDeductionResult.success,
            data: leaveDeductionResult.data,
          });
        
      }
    } catch (error) {
      next(error);
    }
  };
  public UpdateLeaveDeductionCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdateLeaveDeductionCategoryViewmodel,
        req.body
      );
      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error,
        });
      } else {
        let model: UpdateLeaveDeductionCategoryViewmodel =
          conversionResult.data as UpdateLeaveDeductionCategoryViewmodel;
        let leaveDeductionResult =
          await leaveService.UpdateLeaveDeductionCategory(req, model);
        
          return res.status(leaveDeductionResult.status_code).json({
            status_code: leaveDeductionResult.status_code,
            success: leaveDeductionResult.success,
            data: leaveDeductionResult.data,
          });
        
      }
    } catch (error) {
      next(error);
    }
  };

  public AllLeaveDeductionCategoryList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let leaveDeductionCategoryListResult =
        await leaveService.AllLeaveDeductionCategoryList(req);
    
        return res.status(leaveDeductionCategoryListResult.status_code).json({
          status_code: leaveDeductionCategoryListResult.status_code,
          success: leaveDeductionCategoryListResult.success,
          data: leaveDeductionCategoryListResult.data,
        });
      
    } catch (error) {
      next(error);
    }
  };
  public getLeaveDeductionCategoryDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetLeaveDeductionCategoryViewmodel,
        JSON.parse(`{"_id":"${req.params._id}"}`)
      );
      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error,
        });
      } else {
        let leaveDeductionCategoryResult =
          await leaveService.GetLeaveDeductionCategoryDetails(req);
       
          return res.status(leaveDeductionCategoryResult.status_code).json({
            status_code: leaveDeductionCategoryResult.status_code,
            success: leaveDeductionCategoryResult.success,
            data: leaveDeductionCategoryResult.data,
          });
        
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new Leave_Controller();
