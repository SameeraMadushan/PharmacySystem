package com.it15000118.af.stock.restapi.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.it15000118.af.stock.restapi.Model.pharmacySystemModel;

@Repository
public interface pharmacySystemRepository extends MongoRepository<pharmacySystemModel, String> {

	
	public List<pharmacySystemModel> findAll();
	
	public List<pharmacySystemModel> findAlldrugNameDistinctBy();

	public pharmacySystemModel findOne(String ID);
	public pharmacySystemModel findBydrugName(String drugName);

	public pharmacySystemModel save(pharmacySystemModel objPSystem);

	public void delete(pharmacySystemModel objPSystem);
	
	List<pharmacySystemModel> findDistinctpharmacySystemModelByDrugName();
}
