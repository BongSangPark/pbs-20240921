package ucube.com.manage.model;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContractId implements Serializable {
  private String pjtNo;
  private String companyNo;
}
