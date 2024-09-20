package ucube.com.manage.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;

import ucube.com.manage.model.Sign;

@Mapper
public interface SignMapper {

  public List<Sign> listSign(String signMonth);

  public Optional<Sign> findById(HashMap map);

  public List<Sign> listLikeSign(HashMap map);

  public int saveSign(Sign sign);

  public int updateSign(Sign sign);

  public int deleteSign(HashMap map);
}
