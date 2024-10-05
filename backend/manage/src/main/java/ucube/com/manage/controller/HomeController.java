package ucube.com.manage.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ucube.com.manage.model.Home;
import ucube.com.manage.service.MonitorService;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/home")
@Slf4j
public class HomeController {

  private final MonitorService monitorService;

  private HashMap<String, Object> map = new HashMap<String, Object>();

  // like 조회(전체 조회)
  @GetMapping("/like")
  public ResponseEntity<?> findLikeProject(@RequestParam("homeMonth") String homeMonth,
      @RequestParam("pjtNo") String pjtNo) {

    map.put("homeMonth", homeMonth);
    map.put("pjtNo", pjtNo);

    try {
      List<Home> list = monitorService.homeList(map);
      if (list.isEmpty() || list.size() == 0) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }
      return new ResponseEntity<>(list, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
