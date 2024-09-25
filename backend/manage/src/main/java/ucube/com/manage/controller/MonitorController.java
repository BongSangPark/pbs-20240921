package ucube.com.manage.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ucube.com.manage.model.Monitor;
import ucube.com.manage.service.MonitorService;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/monitor")
@Slf4j
public class MonitorController {

  private final MonitorService monitorService;

  private HashMap<String, Object> map = new HashMap<String, Object>();

  // like 조회(전체 조회)
  @GetMapping("/like")
  public ResponseEntity<?> findLikeProject(@RequestParam("signMonth") String signMonth,
      @RequestParam("pjtNo") String pjtNo, @RequestParam("companyNo") String companyNo) {

    map.put("signMonth", signMonth);
    map.put("pjtNo", pjtNo);
    map.put("companyNo", companyNo);

    try {
      List<Monitor> list = monitorService.monitorList(map);
      if (list.isEmpty() || list.size() == 0) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }
      return new ResponseEntity<>(list, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Contract 상세 조회
  @GetMapping("/contractlist/{pjtNo}/{companyNo}")
  public ResponseEntity<?> findContract(@PathVariable("pjtNo") String pjtNo, @PathVariable("companyNo") String companyNo) {
    try {
      List<Monitor> list = monitorService.contractBpList(pjtNo, companyNo);
      if (list.isEmpty() || list.size() == 0) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }
      return new ResponseEntity<>(list, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Assign 상세 조회
  @GetMapping("/assignlist/{pjtNo}/{companyNo}")
  public ResponseEntity<?> findAssign(@PathVariable("pjtNo") String pjtNo, @PathVariable("companyNo") String companyNo) {
    try {
      List<Monitor> list = monitorService.assignBpList(pjtNo, companyNo);
      if (list.isEmpty() || list.size() == 0) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }
      return new ResponseEntity<>(list, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

   // Sign 상세 조회
   @GetMapping("/signlist/{pjtNo}/{companyNo}")
   public ResponseEntity<?> findSign(@PathVariable("pjtNo") String pjtNo, @PathVariable("companyNo") String companyNo) {
     try {
       List<Monitor> list = monitorService.signBpList(pjtNo, companyNo);
       if (list.isEmpty() || list.size() == 0) {
         return new ResponseEntity<>(HttpStatus.NO_CONTENT);
       }
       return new ResponseEntity<>(list, HttpStatus.OK);
     } catch (Exception e) {
       return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
     }
   }
}
